# -*- encoding: utf-8 -*-
# stub: persistent_http 1.0.6 ruby lib

Gem::Specification.new do |s|
  s.name = "persistent_http".freeze
  s.version = "1.0.6"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Brad Pardee".freeze]
  s.date = "2013-09-11"
  s.description = "Persistent HTTP connections using a connection pool".freeze
  s.email = ["bradpardee@gmail.com".freeze]
  s.homepage = "http://github.com/bpardee/persistent_http".freeze
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "Persistent HTTP connections using a connection pool".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<gene_pool>.freeze, [">= 1.3"])
    else
      s.add_dependency(%q<gene_pool>.freeze, [">= 1.3"])
    end
  else
    s.add_dependency(%q<gene_pool>.freeze, [">= 1.3"])
  end
end
