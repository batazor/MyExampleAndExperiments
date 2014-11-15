class Category < ActiveRecord::Base
  validates :title, presence: true, length: { in: 2..50 }
end
