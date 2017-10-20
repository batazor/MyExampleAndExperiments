module WelcomeHelper
  def url_pattern title, id, date = nil
    case @setting.url_pattern
    when "post_id"
      link_to title, post_id_path(id)
    when "post_title"
      link_to title, post_id_path(title)
    when "date_title"
      link_to title, post_date_title_path(date, title)
    else
      link_to "Page not found", "404"
    end
  end
end
