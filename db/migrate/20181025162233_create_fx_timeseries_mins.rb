class CreateFxTimeseriesMins < ActiveRecord::Migration[5.2]
  def change
    create_table :fx_timeseries_mins do |t|
      t.datetime :time
      t.float :open
      t.float :high
      t.float :low
      t.float :close
      t.timestamps
    end
  end
end
