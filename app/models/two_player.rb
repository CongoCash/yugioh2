class TwoPlayer < ApplicationRecord
  after_create_commit do
    TwoPlayerCreationEventBroadcastJob.perform_later(self)
  end
end