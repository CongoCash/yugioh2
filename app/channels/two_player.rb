# app/channels/chat_channel.rb
class TwoPlayer < ApplicationCable::Channel
  def subscribed
    stream_from 'two_player'
  end

  def unsubscribed; end

  def create(opts)
    TwoPlayer.create(
      content: opts.fetch('content')
    )
  end
end