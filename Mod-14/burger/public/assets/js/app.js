$( document ).ready(function() {
    $('.alert').alert().hide()
    $('.eaten').click(function(event){
        let id = $(this).data('id');
        let newDevoured = $(this).data('eaten');
        if (!newDevoured){
            newDevoured = true; 
        } else {
            newDevoured = false;
        }
        let newDevouredState = {
            devoured: newDevoured
        };
        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: newDevouredState
        }).then(function(){
            console.log('Changed devoured to ' + newDevoured);
            location.reload();
        })
    });

    $('.create-form').on('submit', function(event){
        event.preventDefault();
        let burgerName = $('#burger').val().trim();
        if (burgerName === ''){
            
            return $('.alert').alert().show()
        }
        let newBurger = {
            burger_name: burgerName,
            devoured: 0
        };
        
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(function(){
            console.log('New Burger Created');
            location.reload()
        });
    });
});
