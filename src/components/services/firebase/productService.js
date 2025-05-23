import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

export const getTopProducts = async () => {
try {
    const db = getFirestore();
    const productsCollection = collection(db, "products");

    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return products;
    } catch (error) {
    console.error("Error al obtener productos destacados", error);
    throw error;
    }
};

export const getProductsByCategory = async (category) => {
    try {
    const db = getFirestore();
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("category", "==", category));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return products;
    } catch (error) {
    console.error("Error al obtener productos por categoría", error);
    throw error;
    }
};

export const getProductsBySubcategory = async (subcategory) => {
    try {
    const db = getFirestore();
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("subcategory", "==", subcategory));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return products;
    } catch (error) {
    console.error("Error al obtener productos por subcategoría", error);
    throw error;
    }
};

export const getProductById = async (id) => {
    try {
    const db = getFirestore();
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Producto no encontrado");
    }
    } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
    }
};
