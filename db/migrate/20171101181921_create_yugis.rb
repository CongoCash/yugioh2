class CreateYugis < ActiveRecord::Migration[5.1]
  def change
    create_table :yugis do |t|

      t.timestamps
    end
  end
end
