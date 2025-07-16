# weather_analyzer.py

import csv
import statistics
from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class WeatherEntry:
    date: str
    temperature: float

class WeatherAnalyzer:
    def __init__(self, entries: List[WeatherEntry]):
        self.entries = entries

    @classmethod
    def from_csv(cls, filepath: str) -> 'WeatherAnalyzer':
        entries = []
        with open(filepath, newline='') as f:
            for r in csv.DictReader(f):
                try:
                    entries.append(WeatherEntry(r['date'], float(r['temperature'])))
                except:
                    continue
        return cls(entries)

    def stats(self) -> dict:
        t = [e.temperature for e in self.entries]
        return {
            'mean': statistics.mean(t),
            'median': statistics.median(t),
            'max': max(t),
            'min': min(t),
        }

    def moving_avg(self, window: int = 3) -> List[Tuple[str, float]]:
        dates, temps = zip(*[(e.date, e.temperature) for e in self.entries])
        return [
            (dates[i + window - 1],
             sum(temps[i:i+window]) / window)
            for i in range(len(temps) - window + 1)
        ]
    
