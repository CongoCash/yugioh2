class CreateNames < ActiveRecord::Migration[5.1]
  def change
    create_table :names do |t|
      t.string :username
      t.string :password_digest

      t.timestamps
    end
  end
end
