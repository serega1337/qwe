exports.handler = function (event, context, callback) {
    const secretContent = `
    <h3>Wassup area</h3>
    <b>sup clown</b>
    `
    
    let body

    if (event.body) {
        body = JSON.parse(event.body)
    } else {
        body = {}
    }

    if (body.password == "fg381305763") {
        callback(null, {
            statusCode: 200,
            body: secretContent
        })
    } else {
        callback(null, {
            statusCode: 401
        })
    }
    
}