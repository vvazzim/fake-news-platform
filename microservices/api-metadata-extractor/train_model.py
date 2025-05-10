from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Exemple de données simulées
X = [
    "Le président a démissionné", 
    "L’eau gèle à 100 degrés", 
    "Des chats savent parler", 
    "La Terre est ronde", 
    "Le vaccin provoque des mutations"
]
y = [1, 2, 2, 1, 0]  # 0=refute, 1=support, 2=not-enough-evidence

# Vectorisation
vectorizer = TfidfVectorizer()
X_vect = vectorizer.fit_transform(X)

# Modèle
model = RandomForestClassifier()
model.fit(X_vect, y)

# Sauvegarde
joblib.dump(model, "model.joblib")
joblib.dump(vectorizer, "vectorizer.joblib")
