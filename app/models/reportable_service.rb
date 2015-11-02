class ReportableService

  def self.parent_record_type
    Child
  end

  def self.record_field_name
    'services_section'
  end


  include ReportableNestedRecord

  searchable do
    extend ReportableNestedRecord::Searchable
    configure_searchable(ReportableService)
  end

  def id
    object_value('unique_id')
  end

end