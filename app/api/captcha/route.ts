const POST = async(request:Request) =>{
    try {
        const body = await request.json();
        const { token } = body;
        const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
        const response = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
          });
          const data = await response.json();

          if (data.success) {
            return Response.json({ success: true });
          } else {
            return Response.json({ 
              success: false, 
              error: 'Invalid captcha' 
            }, { status: 400 });
          }
        } catch (error) {
          return Response.json({ 
            success: false, 
            error: 'Server error' 
          }, { status: 500 });
        }
}