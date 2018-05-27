var sendChannel, 
    receiveChannel,
    chatWindow = document.querySelector('.chat-window'),
    chatWindowMessage = document.querySelector('.chat-window-message'),
    chatThread = document.querySelector('.chat-thread');
    enter_msg = ""
    resposta_padrao = "Desculpa, não entendi. Mas estou aprendendo!";    

// Create WebRTC connection
createConnection();

// On form submit, send message
chatWindow.onsubmit = function (e) {
	e.preventDefault();

	sendData();

	return false;
};

function createConnection () {
    var servers = null;

    if (window.mozRTCPeerConnection) {
	    window.localPeerConnection = new mozRTCPeerConnection(servers, {
	        optional: [{
	            RtpDataChannels: true
	        }]
	    });
    } else {
	    window.localPeerConnection = new webkitRTCPeerConnection(servers, {
	        optional: [{
	            RtpDataChannels: true
	        }]
	    });
    }

    try {
        // Reliable Data Channels not yet supported in Chrome
        sendChannel = localPeerConnection.createDataChannel('sendDataChannel', {
            reliable: false
        });
    } catch (e) {
    }

    localPeerConnection.onicecandidate = gotLocalCandidate;
    // sendChannel.onopen = handleSendChannelStateChange;
    // sendChannel.onclose = handleSendChannelStateChange;

    if (window.mozRTCPeerConnection) {
	    window.remotePeerConnection = new mozRTCPeerConnection(servers, {
	        optional: [{
	            RtpDataChannels: true
	        }]
	    });
    } else {
	    window.remotePeerConnection = new webkitRTCPeerConnection(servers, {
	        optional: [{
	            RtpDataChannels: true
	        }]
	    });
    }

    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
    remotePeerConnection.ondatachannel = gotReceiveChannel;

    // Firefox seems to require an error callback
    localPeerConnection.createOffer(gotLocalDescription, function (err) {
    });
}

function sendData () {
    enter_msg += "<li>" + $("#enter_msg_chat").val() + "</li>";
    $("#msgs_chat").html(enter_msg);
    getResponse();
    $("#enter_msg_chat").val("");
}

function gotLocalDescription (desc) {
    localPeerConnection.setLocalDescription(desc);
    remotePeerConnection.setRemoteDescription(desc);
    // Firefox seems to require an error callback
    remotePeerConnection.createAnswer(gotRemoteDescription, function (err) {
    });
}

function gotRemoteDescription (desc) {
    remotePeerConnection.setLocalDescription(desc);
    localPeerConnection.setRemoteDescription(desc);
}

function gotLocalCandidate (event) {
    if (event.candidate) {
        remotePeerConnection.addIceCandidate(event.candidate);
    }
}

function gotRemoteIceCandidate (event) {
    if (event.candidate) {
        localPeerConnection.addIceCandidate(event.candidate);
    }
}

function gotReceiveChannel (event) {
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleMessage;
    receiveChannel.onopen = handleReceiveChannelStateChange;
    receiveChannel.onclose = handleReceiveChannelStateChange;
}

function handleMessage (event) {
    var chatNewThread = document.createElement('li'),
    	chatNewMessage = document.createTextNode(event.data);

    // Add message to chat thread and scroll to bottom
    chatNewThread.appendChild(chatNewMessage);
    chatThread.appendChild(chatNewThread);
    chatThread.scrollTop = chatThread.scrollHeight;

    // Clear text value
    chatWindowMessage.value = '';
}

function handleReceiveChannelStateChange () {
    var readyState = receiveChannel.readyState;
}
function getResponse() 
{
    $.ajax({
        url: 'https://api.wit.ai/message',
        data: {
            'q': $("#enter_msg_chat").val(),
            'access_token' : '2ULD2JQPRHCSVGNXUJWT74ZBSNULVE2Y'
        },
        dataType: 'jsonp',
        method: 'GET',
        success: function(response) {
            var resposta_robo = resposta_padrao;
            var entity_name = Object.keys(response.entities)[0];
            var options = "";
            var index = 0;

            if (response.entities[entity_name] != undefined) {
                var entities = response.entities[entity_name];
                resposta_robo = entities[0].value;
                
                if(is_data_inDB(entity_name) == true) {
                    options = getResponseFromDB(entity_name);
                }

                enter_msg += "<li>" + resposta_robo + "</li>";
                
                if(options!="") {
                    enter_msg += options;
                }

                $("#msgs_chat").html(enter_msg);
                index = get_index_option_inDB(response._text, getDataByKey(entity_name));
                $('.show-options').val(index);
                setItensOrder();
            }
        }
    });
}