# -*- encoding: utf-8 -*-
# stub: persistent_httparty 0.1.2 ruby lib

Gem::Specification.new do |s|
  s.name = "persistent_httparty".freeze
  s.version = "0.1.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Matt Campbell".freeze]
  s.date = "2014-07-21"
  s.description = "Persistent HTTP connections for HTTParty using the persistent_http gem. Keep the party alive!".freeze
  s.email = ["persistent_httparty@soupmatt.com".freeze]
  s.homepage = "https://github.com/soupmatt/persistent_httparty".freeze
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "Persistent HTTP connections for HTTParty".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<httparty>.freeze, ["~> 0.9"])
      s.add_runtime_dependency(%q<persistent_http>.freeze, ["< 2"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 2.13.0"])
      s.add_development_dependency(%q<cucumber>.freeze, [">= 0"])
      s.add_development_dependency(%q<webmock>.freeze, [">= 0"])
    else
      s.add_dependency(%q<httparty>.freeze, ["~> 0.9"])
      s.add_dependency(%q<persistent_http>.freeze, ["< 2"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
      s.add_dependency(%q<rspec>.freeze, ["~> 2.13.0"])
      s.add_dependency(%q<cucumber>.freeze, [">= 0"])
      s.add_dependency(%q<webmock>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<httparty>.freeze, ["~> 0.9"])
    s.add_dependency(%q<persistent_http>.freeze, ["< 2"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 2.13.0"])
    s.add_dependency(%q<cucumber>.freeze, [">= 0"])
    s.add_dependency(%q<webmock>.freeze, [">= 0"])
  end
end
