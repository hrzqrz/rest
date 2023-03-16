import datetime

def generate_order_number(pk):
    current_datetiem = datetime.datetime.now().strftime('%Y%m%d%H%S') #20230616 + pk
    order_number = current_datetiem + str(pk)
    return order_number