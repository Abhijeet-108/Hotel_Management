import React from 'react'

function Login() {
    return (
        <AuthLayout>
            <form>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button>Login</Button>
            </form>
        </AuthLayout>
    )
}

export default Login
