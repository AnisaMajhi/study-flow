import statistics
from typing import List, Tuple, Dict

def summary_stats(data: List[Tuple[str, float]]) -> Dict[str, float]:
    """
    Given (date, temp) list, return mean, median, max, min.
    """
    temps = [t for _, t in data]
    return {
        'mean': statistics.mean(temps),
        'median': statistics.median(temps),
        'max': max(temps),
        'min': min(temps),
    }

def moving_average(data: List[Tuple[str, float]], window: int = 3):
    """
    Returns list of (date, avg) using sliding window.
    """
    if len(data) < window:
        return []
    dates, temps = zip(*data)
    return [
        (dates[i + window - 1],
         sum(temps[i:i+window]) / window)
        for i in range(len(temps) - window + 1)
    ]
