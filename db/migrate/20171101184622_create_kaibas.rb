class CreateKaibas < ActiveRecord::Migration[5.1]
  def change
    create_table :kaibas do |t|

      t.timestamps
    end
  end
end
