class AddImagesToKaibaYugi < ActiveRecord::Migration[5.1]
  def change
    add_column :yugis, :facedown_spell, :string, :default => 'https://i.pinimg.com/originals/ed/b7/02/edb702c8400d4b0c806d964380b03b6a.jpg'
    add_column :kaibas, :facedown_spell, :string, :default => 'https://i.pinimg.com/originals/ed/b7/02/edb702c8400d4b0c806d964380b03b6a.jpg'
    add_column :yugis, :facedown_def, :string, :default => 'http://vignette3.wikia.nocookie.net/yugioh/images/6/68/Face_Down_Defense_Position.png/revision/latest?cb=20100726091546'
    add_column :kaibas, :facedown_def, :string, :default => 'http://vignette3.wikia.nocookie.net/yugioh/images/6/68/Face_Down_Defense_Position.png/revision/latest?cb=20100726091546'
  end
end
