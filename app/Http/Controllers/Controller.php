<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Http;
use Illuminate\View\View;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * * The Controller Model.
     * @var User
     */
    protected $model = User::class;

    /**
     * * Returns the index page.
     * @return Redirector|View
     */
    public function index()
    {
        if (Auth::check()) {
            return redirect(config('app.panel.url'));
        } else {
            return view('index', [
                // ? Return variables.
            ]);
        }
    }

    /**
     * * Sign the User in.
     * @param Request $request
     * @return RedirectResponse|JsonResponse
     */
    function in(Request $request)
    {
        $input = (object) $request->all();

        $request->validate($this->model::$validation['sign']['in']['rules'], $this->model::$validation['sign']['in']['messages'][config('app.locale')]);

        if (!Auth::attempt([
            'email' => $input->email,
            'password' => $input->password,
        ], true)) {
            if ($request->wantsJson()) {
                return response()
                    ->json([
                        'code' => 404,
                        'message' => 'Correo y/o contraseña incorrectos.',
                    ]);
            }

            return redirect()
                ->back()
                ->withErrors([
                    'email' => true,
                    'password' => 'Correo y/o contraseña incorrectos.',
                ]);
        }

        $response = Http::post(config('app.api.url') . "/sign-in", [
            "email" => $input->email,
            "password" => $input->password,
        ]);

        $response = Http::post(config('app.catalog.url') . "/sign-in", [
            "email" => $input->email,
            "password" => $input->password,
        ]);

        if ($request->wantsJson()) {
            return response()
                ->json([
                    'code' => 200,
                    'message' => 'Sesión iniciada.',
                ]);
        }

        return redirect(config('app.api.url'));
    }

    /**
     * * Sign the User out.
     * @return RedirectResponse|JsonResponse
     */
    function out()
    {
        Auth::logout();

        $response = Http::get(config('app.api.url') . "/sign-out");

        $response = Http::get(config('app.catalog.url') . "/sign-out");

        if ($request->wantsJson()) {
            return response()
                ->json([
                    'code' => 200,
                    'message' => 'Sesión cerrada.',
                ]);
        }

        return route('index');
    }
}