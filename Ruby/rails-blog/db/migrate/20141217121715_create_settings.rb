class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.string :url_pattern
    end
  end
end
