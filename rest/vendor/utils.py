from .models import Vendor

#helper to retrive the vendor for category fooditem and so on ...
def get_vendor(request):
    return Vendor.objects.get(user=request.user)