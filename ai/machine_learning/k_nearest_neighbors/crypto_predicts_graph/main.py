from traceback import print_tb
import pandas as pd
import numpy as np
from collections import Counter

# 1. Load data
df = pd.read_csv('./data/data_1.csv', on_bad_lines='skip')

# 2. Buat label: apakah besok naik (bullish = 1) atau turun (bearish = 0)
df['Target'] = (df['Close'].shift(-1) > df['Close']).astype(int)
df.dropna(inplace=True)

# 3. Ambil fitur (bisa tambah lebih banyak)
features = ['Close', 'Volume']
X = df[features].values
y = df['Target'].values

# 4. Normalisasi fitur manual (min-max)
X_norm = (X - X.min(axis=0)) / (X.max(axis=0) - X.min(axis=0))

# 5. Bagi data train-test manual
split_index = int(0.8 * len(X_norm))
X_train, X_test = X_norm[:split_index], X_norm[split_index:]
y_train, y_test = y[:split_index], y[split_index:]

# 6. Fungsi jarak Euclidean
def euclidean_distance(a, b):
    return np.sqrt(np.sum((a - b) ** 2))

# 7. Fungsi KNN manual
def knn_predict(x_test, X_train, y_train, k):
    distances = []
    for i, x_train in enumerate(X_train):
        dist = euclidean_distance(x_test, x_train)
        distances.append((dist, y_train[i]))
    # Urutkan berdasarkan jarak
    distances.sort(key=lambda x: x[0])
    # Ambil K tetangga
    k_nearest = [label for (_, label) in distances[:k]]
    # Voting
    most_common = Counter(k_nearest).most_common(1)
    return most_common[0][0]

# 8. Evaluasi prediksi untuk semua data uji
k = 5
predictions = []
for x in X_test:
    pred = knn_predict(x, X_train, y_train, k)
    predictions.append(pred)

print("Prediksi KNN Manual:")
for i, pred in enumerate(predictions):
    print(f"Data {i+1}: Prediksi = {pred}, Aktual = {y_test[i]}")
    
# 9. Hitung akurasi
correct = sum(pred == true for pred, true in zip(predictions, y_test))
accuracy = correct / len(y_test)
print(f"Akurasi KNN Manual (k={k}): {accuracy:.2f}")
