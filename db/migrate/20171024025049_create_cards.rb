class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :card_name
      t.integer :attack
      t.integer :defense
      t.string :type
      t.integer :stars
      t.string :attribute
      t.string :description

      t.timestamps
    end
  end
end
