const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://192.168.1.40:5022/chat")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        async function start() {
            try {
                await connection.start();

                console.log("CONNECTED");
            }
            catch (err) {
                console.log(err);
                setTimeout(start, 5000);
            }
        };
        console.log("hello");

        connection.onclose(async () => {
            await start();
        });

        connection.on("message", (user, message) => {
            const p = document.createElement("p");
            p.textContent = `${user}: ${message}`;
            document.getElementById("divId").appendChild(p);
        });

        start();

        async function sendMssg() {
            let userText = document.getElementById('usertxt').value;
            try {
                await connection.invoke("SendMessage", "user", userText);
            }
            catch (err) {
                console.log(err);
            }
        }