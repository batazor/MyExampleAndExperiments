module ApplicationHelper
  def head_title
    if content_for(:title).present?
      "#{content_for :title} | Quest-rails"
    else
      "Quest-rails"
    end
  end
end
