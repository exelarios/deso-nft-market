import { useState } from "react";
import { useUserContext } from "../utils/useUserContext";

export function MintNFT(props) {
  const { NFTPostHashHex } = props;
  const { credentials, service } = useUserContext();
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState({
    "NumCopies": 1,
    "IsForSale": false,
    "MinBidAmountNanos": 1000,
    "IsBuyNow": false,
    "BuyNowPriceNanos": 1500,
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const request = {
        UpdaterPublicKeyBase58Check: credentials.key,
        NFTPostHashHex: NFTPostHashHex,
        NumCopies: Number(form.NumCopies),
        NFTRoyaltyToCreatorBasisPoints: 50,
        NFTRoyaltyToCoinBasisPoints: 100,
        HasUnlockable: false,
        IsForSale: form.IsForSale,
        MinBidAmountNanos: Number(form.MinBidAmountNanos),
        IsBuyNow: form.IsBuyNow,
        BuyNowPriceNanos: Number(form.BuyNowPriceNanos),
        MinFeeRateNanosPerKB: 1500
      };

      const response = await service.nft.createNft(request);
      if (response?.TransactionHex) {
        alert("successfully submitted minited nft");
      }

    } catch(error) {
      console.log(error);
      alert(error.message);
    }

  }

  const handleInputs = (event) => {
    const type = event.target.type;
    const value = type === "checkbox" ? event.target.checked : event.target.value;
    const name = event.target.name;
    setForm({
      ...form,
      [name]: value
    });
  }

  return (
    <div>
      <button 
        onClick={() => setOpen(!isOpen)}>
        {isOpen ? "close mint nft" : "mint nft"}
      </button>
      {isOpen &&
        <form onSubmit={handleOnSubmit}>
          <fieldset>
            <legend>Mint NFT</legend>
            <div>
              <label>NumOfCopies: </label>
              <input 
                type="number"
                name="NumCopies"
                value={form.NumCopies}
                onChange={handleInputs}
              />
            </div>
            <div>
              <label>IsForSale: </label>
              <input
                type="checkbox" 
                name="IsForSale"
                value={form.IsForSale}
                onChange={handleInputs}
              />
            </div>
            {form.IsForSale &&
              <>
                <div>
                  <label>IsBuyNow: </label>
                  <input
                    type="checkbox"
                    name="IsBuyNow"
                    value={form.IsBuyNow}
                    onChange={handleInputs}
                  />
                </div>
                <div>
                  <label>MinBidAmountNanos: </label>
                  <input
                    type="number"
                    name="MinBidAmountNanos"
                    value={form.MinBidAmountNanos}
                    onChange={handleInputs}
                  />
                </div>
                <div>
                  <label>BuyNowPriceNanos: </label>
                  <input
                    type="number"
                    name="BuyNowPriceNanos"
                    value={form.BuyNowPriceNanos}
                    onChange={handleInputs}
                  />
                </div>
              </>
            }
            <input type="submit"/>
          </fieldset>
        </form>
      }
    </div>
  );
}