using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
  public async Task SendMessage(string user, string message)
  {
    await Clients.All.SendAsync("message", user, message);
  }

  public override async Task OnConnectedAsync()
  {
    await Clients.All.SendAsync("new", Context.ConnectionId);
    await base.OnConnectedAsync();
  }
}