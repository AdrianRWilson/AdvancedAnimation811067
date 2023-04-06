$('#selectFileButton').click(() => {
    $.ajax({
        url: '/myEndpoint',
        type: 'POST',
        success: (response) => {
            console.log(response);
        },
        error: (err) => {
            console.error(err);
        }
    });
});