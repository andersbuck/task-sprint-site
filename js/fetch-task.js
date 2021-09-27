var TaskSprint = window.TaskSprint || {};

(function fetchTasksScopeWrapper($) {
    var authToken;

    TaskSprint.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function fetchTasks() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/tasks',
            headers: {
                Authorization: authToken
            },
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching tasks: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        var select = document.getElementById("tasks"); 

        for(var i = 0; i < result.data.length; i++) {
            var opt = result.data[i];
            var el = document.createElement("option");
            el.textContent = opt.name;
            el.value = opt.taskId;
            select.appendChild(el);
        }​
    }

    // Register click handler for #request button
    $(function onDocReady() {
        fetchTasks();
        $('#completeTaskSubmit').click(handleRequestClick);

    });

    function handleRequestClick(event) {
        event.preventDefault();
    }

}(jQuery));