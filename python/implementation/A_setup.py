import csv
from typing import List, Tuple

def load_data(filepath: str) -> List[Tuple[str, float]]:
    """
    Loads weather CSV with columns 'date' and 'temperature'.
    Returns list of (date, temp).
    """
    rows = []
    try:
        with open(filepath, newline='') as f:
            reader = csv.DictReader(f)
            for r in reader:
                try:
                    rows.append((r['date'], float(r['temperature'])))
                except (ValueError, KeyError):
                    # skip bad rows
                    continue
    except FileNotFoundError:
        raise
    return rows
