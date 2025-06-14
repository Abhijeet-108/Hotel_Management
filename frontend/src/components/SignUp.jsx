import React from 'react'

function SignUp() {
    return (
        <AuthLayout>
            <form>
                <Input type="text" placeholder="Full Name" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button>Sign Up</Button>
            </form>
        </AuthLayout>
    )
}

export default SignUp
