class CreateTwoPlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :two_players do |t|

      t.timestamps
    end
  end
end
