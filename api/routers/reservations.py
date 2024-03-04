from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models import ReservationIn, ReservationOut, PydanticObjectId
from queries.reservations import ReservationsRepo
from authenticator import authenticator

router = APIRouter()


def get_reservations_repo():
    return ReservationsRepo()

@router.post("/api/reservations", response_model=ReservationOut, status_code=status.HTTP_201_CREATED)
async def create_reservation(
    reservation_in: ReservationIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    reservations_repo: ReservationsRepo = Depends(get_reservations_repo)
):
    new_reservation = reservations_repo.create(reservation_in, account_id=account_data["id"])
    if not new_reservation:
        raise HTTPException(status_code=400, detail="Error creating reservation.")

    return new_reservation
