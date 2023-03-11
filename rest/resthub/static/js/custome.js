$(document).ready(function(){
    // add to cart function 
    $('.add_to_cart').on('click', function(e){
        e.preventDefault();
        
        food_id = $(this).attr('data-id')
        url = $(this).attr('data-url')

        data = {
            food_id: food_id,
        }

        $.ajax({
            type: 'GET',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            url: url,
            data: data,
            success: function(response){
                if(response.status == 'login_required'){
                    swal(response.message, '', 'info').then(function(){
                        window.location = '/login';
                    })
                }if(response.status == 'Failed'){
                    swal(response.message, '', 'error')
                }else{
                    $('#cart_counter').html(response.cart_counter['cart_count']);
                    $('#qty-'+food_id).html(response.qty);

                    // subtotal, tax and grand total
                    applyCartAmounts(
                        response.cart_amount['subtotal'],
                        response.cart_amount['tax'],
                        response.cart_amount['grand_total'])
                }
            }
        })
    })

    //  place the cart item quantity on load
    $('.item_qty').each(function(){
        var the_id = $(this).attr('id')
        var qty = $(this).attr('data-qty')
        $('#'+the_id).html(qty)
    })

    // decrease cart function 
    $('.decrease_cart').on('click', function(e){
        e.preventDefault();

        food_id = $(this).attr('data-id')
        url = $(this).attr('data-url')
        cart_id = $(this).attr('id')
        data = {
            food_id: food_id
        }

        $.ajax({
            type: 'GET',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            url: url,
            data: data, 
            success: function(response){
                if(response.status == 'login_required'){
                    swal(response.message, '', 'info').then(function(){
                        window.location = '/login';
                    })
                }else if(response.status == 'Failed'){
                    swal(response.status, '', 'error')
                }else{
                    $('#cart_counter').html(response.cart_counter['cart_count']);
                    $('#qty-'+food_id).html(response.qty);
                    // subtotal, tax and grand total
                    applyCartAmounts(
                        response.cart_amount['subtotal'],
                        response.cart_amount['tax'],
                        response.cart_amount['grand_total']);

                    if(window.location.pathname = '/cart/'){
                        removeCartItem(response.qty, cart_id)
                        checkEmptyCart()
                    } 
                }
                
            }
        })
    })

    // decrease cart function 

    // delete cart item in cart page
    $('.delete_cart').on('click', function(e){
        e.preventDefault();

        cart_id = $(this).attr('data-id')
        url = $(this).attr('data-url')

        // data = {
        //     food_id: food_id
        // }

        $.ajax({
            type: 'GET',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            url: url,
            // data: data, 
            success: function(response){
                if(response.status == 'Failed'){
                    swal(response.status, '', 'error')
                }else{
                    $('#cart_counter').html(response.cart_counter['cart_count']);
                    swal(response.status, response.message, 'success');
                    // subtotal, tax and grand total
                    applyCartAmounts(
                        response.cart_amount['subtotal'],
                        response.cart_amount['tax'],
                        response.cart_amount['grand_total']);

                    removeCartItem(0, cart_id);
                    checkEmptyCart();
                }
                
            }
        })
    })
    // delete cart item in cart page

    // delete the cart element if the qty is 0
    function removeCartItem(cartItemQty, cart_id){
        if(cartItemQty <= 0){
            //remove the cart item element
            document.getElementById("cart-item -"+cart_id).remove()
        }  
    }
    // delete the cart element if the qty is 0

    // check if the cart is empty
    function checkEmptyCart(){
        var cart_counter = document.getElementById('cart_counter').innerHTML
        if(cart_counter == 0 ){
            document.getElementById('empty-cart').style.display = "block";
        }
    }
    // check if the cart is empty

    // apply cart amounts
    function applyCartAmounts(subtotal, tax, grand_total){
        if(window.location.pathname == '/cart/'){
            $('#subtotal').html(subtotal)
            $('#tax').html(tax)
            $('#total').html(grand_total)
        }
        
    }
    // apply cart amounts

})