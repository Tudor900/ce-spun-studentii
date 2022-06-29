import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlashRound, FlashRoundAnswers } from "../shared/models/flash-round";
import { FLASH_ROUND_COLLECTION } from "../utils/contants";
import { firestore } from "../utils/firebase/firebase";

function useFlashRound(docId: string) {
    const [flashAnswers, setFlashAnswers] = useState<FlashRound>();

    useEffect(() => {
        const unsubscribe = docId ? onSnapshot(doc(firestore, FLASH_ROUND_COLLECTION, docId), (data => {
            setFlashAnswers(data.data());
        })) : () => { };

        return () => {
            unsubscribe();
        }
    }, [docId]);

    return flashAnswers;
}

export default useFlashRound;