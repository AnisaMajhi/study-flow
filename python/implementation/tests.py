import pytest

# Test A_setup.py

from python.A_setup import load_data

def test_load_data(tmp_path, capsys):
    # create temp CSV
    content = "date,temperature\n2023-01-01,10\nbad,row\n2023-01-02,20\n"
    fp = tmp_path / "w.csv"
    fp.write_text(content)
    data = load_data(str(fp))
    assert data == [("2023-01-01", 10.0), ("2023-01-02", 20.0)]


# Test B_weather_stats.py

from python.B_weather_stats import summary_stats, moving_average

def test_summary_stats():
    data = [("d1", 1), ("d2", 3), ("d3", 5)]
    stats = summary_stats(data)
    assert stats == {'mean': 3.0, 'median': 3.0, 'max': 5, 'min': 1}

def test_moving_average():
    data = [("d1", 1), ("d2", 2), ("d3", 3), ("d4", 4)]
    ma = moving_average(data, window=2)
    assert ma == [("d2", 1.5), ("d3", 2.5), ("d4", 3.5)]

# Test C_weather_analyzer.py

from C_weather_analyzer import WeatherEntry, WeatherAnalyzer

@pytest.fixture
def sample():
    return [WeatherEntry("d1", 1), WeatherEntry("d2", 2), WeatherEntry("d3", 3)]

def test_from_csv(tmp_path):
    fp = tmp_path / "w.csv"
    fp.write_text("date,temperature\nx,5\n")
    wa = WeatherAnalyzer.from_csv(str(fp))
    assert wa.entries == [WeatherEntry("x", 5.0)]

def test_stats(sample):
    wa = WeatherAnalyzer(sample)
    assert wa.stats() == {'mean': 2.0, 'median': 2.0, 'max': 3, 'min': 1}

def test_moving_avg(sample):
    wa = WeatherAnalyzer(sample)
    assert wa.moving_avg(window=2) == [("d2", 1.5), ("d3", 2.5)]

def test_outliers(sample):
    sample2 = [WeatherEntry("d1", 1), WeatherEntry("d2", 1), WeatherEntry("d3", 10)]
    wa = WeatherAnalyzer(sample2)
    outs = wa.outliers(z_thresh=1.0)
    assert len(outs) == 1 and outs[0].temperature == 10
