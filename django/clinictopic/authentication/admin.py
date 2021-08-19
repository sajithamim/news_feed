from django.contrib import admin

# Register your models here.
from .models import User,Profile,Qualifications,Accomplishments


# class UserAdmin(admin.ModelAdmin):
#     list_display = ['phone', 'email', 'auth_provider', 'created_at']


admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Qualifications)
admin.site.register(Accomplishments)


