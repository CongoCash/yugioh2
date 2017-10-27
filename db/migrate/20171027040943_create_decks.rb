class CreateDecks < ActiveRecord::Migration[5.1]
  def change
    create_table :decks do |t|
      t.belongs_to :decks, index:true
      t.belongs_to :users, index:true
      t.timestamps
    end
  end
end
