<?php

namespace App\Models;

use Auth;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * * The table name.
     * @var string
     */
    protected $table = 'users';

    /**
     * * The table primary key name.
     * @var string
     */
    protected $primaryKey = 'id_user';

    /**
     * * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'email',
        'name',
        'password',
        'slug',
    ];

    /**
     * * The attributes that should be hidden for arrays.
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * * The attributes that should be cast to native types.
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * * Validation messages and rules.
     * @static
     * @var array
     */
    public static $validation = [
        'sign' => [
            'in' => [
                'rules' => [
                    'email' => 'required',
                    'password' => 'required|min:4',
                ], 'messages' => [
                    'es' => [
                        'email.required' => 'El correo es obligatorio.',
                        'password.required' => 'La contraseña es obligatoria.',
                        'password.min' => 'La contraseña no puede tener menos de :min caracteres.',
                    ],
                ],
            ],
        ],
    ];
}