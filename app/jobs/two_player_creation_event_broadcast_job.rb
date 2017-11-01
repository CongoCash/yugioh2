class TwoPlayerCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(two_player)
    ActionCable
      .server
      .broadcast('two_player',
                 id: two_player.id,
                 created_at: two_player.created_at.strftime('%H:%M'),
                 content: two_player.content)
  end
end