import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./Home";

function SignIn() {
	const [error, setError] = useState("");
	const [isAuthenticated, setAuthenticated] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(2);
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try {
            const response = await fetch("http://localhost:3000/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            console.log("jhfgvgswergjkghk5454",response);
            if (response.ok) {
                const data = await response.json();
                console.log("Server response:", data);
                localStorage.setItem("user_id",JSON.stringify(data.user_id!))
                console.log("User signed in successfully!");
                const list:[{product:{product_id:string},quantity:number}] = JSON.parse(localStorage.getItem('cart'))
                list.forEach((item)=>{
                    const reqOp = {
                        method:'PUT',
                        body: {
                        user_id: data.user_id,
                         cart: [
                          {
                        prodact_id :item.product.product_id,
                        quantity : item.quantity
                          },
                         ]
                        },  headers: {
                            'Authorization': `Bearer ${data.accessToken}`,
                            'Content-Type': 'application/json',
                          }}
                    fetch('http://localhost:3000/cart/update', reqOp)
                })
                localStorage.setItem("token", data.accessToken);
                setEmail(email);
                setPassword(password);
                setAuthenticated(true);
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            console.error("Error during signin:", error.message);
        }
        navigate(-1)
    };
	const defaultTheme = createTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form
						// component="form"
						onSubmit={handleSubmit}
					// noValidate
					// sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						{error && (
							<Typography variant="body2" color="error">
								{error}
							</Typography>
						)}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs></Grid>
							<Grid item>
								<Link href="Sign Up" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Container>
			{isAuthenticated ? <p>connected</p> : <p>not connected</p>}
		</ThemeProvider>
	);
}

export default SignIn;