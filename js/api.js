$.ajax({
    url: 'https://api.wit.ai/message',
    data: {
        'q': 'Bom dia!',
        'access_token' : '2ULD2JQPRHCSVGNXUJWT74ZBSNULVE2Y'
    },
    dataType: 'jsonp',
    method: 'GET',
    success: function(response) {
        var entities = response.entities[Object.keys(response.entities)[0]];
        console.log("success!", response);
        console.log(entities[0].value);
    }
});