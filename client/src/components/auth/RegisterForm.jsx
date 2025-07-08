import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "@/services/authService"

const Register = () => {
    const navigate = useNavigate()
    
    const handleRegister = async (formData) => {
        const data = Object.fromEntries(formData)
        try {
            await registerUser(data)
            navigate('/app/dashboard')
        } catch (err) {
            console.log('Error:', err)
        }
    }

    return (
        <Card className="w-1/3">
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleRegister}>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                    <br />
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                    <br />
                    <Button type="submit">Register</Button>
                </form>
                <Link to="/">Already have an account?</Link>
            </CardContent>
        </Card>
    )
}

export default Register