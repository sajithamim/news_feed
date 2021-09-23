from django.template.loader import get_template
from django.core.mail import EmailMessage
from django.conf import settings

def send_email_from_app(to,link):
    html_tpl_path = 'email_templates/verify.html'
    context_data =  {'name': to,'link':link}
    email_html_template = get_template(html_tpl_path).render(context_data)
    receiver_email = to
    email_msg = EmailMessage('Email Activation', 
                                email_html_template, 
                                settings. APPLICATION_EMAIL,
                                [receiver_email],
                                reply_to=[settings.APPLICATION_EMAIL]
                                )
    # this is the crucial part that sends email as html content but not as a plain text
    email_msg.content_subtype = 'html'
    email_msg.send(fail_silently=False)

def send_email_from_app_otp(to,otp):
    html_tpl_path = 'email_templates/otp.html'
    context_data =  {'name': to,'otp':otp}
    email_html_template = get_template(html_tpl_path).render(context_data)
    receiver_email = to
    email_msg = EmailMessage('Sign in otp', 
                                email_html_template, 
                                settings. APPLICATION_EMAIL,
                                [receiver_email],
                                reply_to=[settings.APPLICATION_EMAIL]
                                )
    # this is the crucial part that sends email as html content but not as a plain text
    email_msg.content_subtype = 'html'
    email_msg.send(fail_silently=False)