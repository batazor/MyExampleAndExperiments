class Tags < ActiveRecord::Base
  validates :name, presence: true
end
