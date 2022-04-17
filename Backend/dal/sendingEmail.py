import smtplib, ssl

def sendNewPassword(randomPassword,email,name):
    port = 587  # For starttls
    smtp_server = "smtp.gmail.com"
    sender_email ="alzheimerhastaliktest@gmail.com"
    print(email)
    receiver_email = email
    password = "alzheimer2022"
    message = """Subject: Yeni Sifreniz

Merhaba {name}

Yeni sifreniz: {randomPassword}

Yeni bir sifre belirlemek icin hesabiniza giris yaptiktan sonra Profil linkinden sifremi degistir butonu ile sifrenizi degistirebilirsiniz"""

    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.format(randomPassword=randomPassword,name=name))