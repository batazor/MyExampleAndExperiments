class Product < ActiveRecord::Base

  validates :title, :description, :image_url, presence: { message: "can't be empty" }
  validates :title, uniqueness: true, length: { minimum: 10 }
  validates :price, numericality: {greater_than_or_equal_to: 0.01}
  validates :image_url, allow_blank: true, format: {
    with: %r{\.(gif|jpg|png)\Z}i,
    message: 'The URL must point to the image format GIF, JPG or PNG.'
  }

  def self.latest
    Product.order(:updated_at).last
  end

end
