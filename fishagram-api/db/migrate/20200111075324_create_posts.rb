class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :caption
      t.integer :weight
      t.integer :length
      t.string :lure_used

      t.timestamps
    end
  end
end
