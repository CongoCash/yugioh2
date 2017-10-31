class DeleteGameModel < ActiveRecord::Migration[5.1]
  def up
    drop_table :games
  end
end
