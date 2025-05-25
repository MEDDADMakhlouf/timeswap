export default function () {
    return (
        <>
            <h1>Login to my account</h1>
            <p>Enter your email below to login to your account</p>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" />
            </div>

            <div className="password-input">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" />
            </div>
            <button> Sign In with Email </button>
        </>
    );
}
